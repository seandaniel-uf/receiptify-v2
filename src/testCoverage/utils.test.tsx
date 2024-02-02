import {
  currentDate,
  generateRandomNumber,
  returnTimeRange,
  formatTimeFromMilliseconds,
  addTotal,
} from "../utils.ts";

import { type ReceiptProps } from "../Components/Receipt";

const mockReceiptData: ReceiptProps = {
  href: "https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range=short_term",
  items: [
    {
      id: "222",
      external_urls: {
        spotify: "2332",
      },
      name: "Name",
      duration_ms: 254493,
    },
  ],
};

describe("Utility helper functions", () => {
  it("should return the current date", () => {
    expect(currentDate).toEqual(currentDate);
  });

  it("should generate a random number that has 4 digits", () => {
    const randomNumber = generateRandomNumber(4);

    expect(randomNumber.toString().length).toBe(4);
  });

  it("should return the time range Last Month if the receipt data includes short_term", () => {
    expect(returnTimeRange(mockReceiptData)).toEqual("Last Month");
  });

  it("should return the time range All Time if the receipt data includes long_term", () => {
    const mockReceiptDataLongTerm: ReceiptProps = {
      ...mockReceiptData,
      href: "https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range=long_term",
    };

    expect(returnTimeRange(mockReceiptDataLongTerm)).toEqual("All Time");
  });
  it("should return the time range Last 6 Months if the receipt data includes does not include short_term or long_term", () => {
    const mockReceiptDataShortTerm: ReceiptProps = {
      ...mockReceiptData,
      href: "https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0",
    };
    expect(returnTimeRange(mockReceiptDataShortTerm)).toEqual("Last 6 Months");
  });

  it("should format the time from milliseconds to standard minute:seconds", () => {
    expect(formatTimeFromMilliseconds(254493)).toEqual("4:14");
  });

  it("should total up the time from all songs if it is a track selected and duration_ms key is present", () => {
    expect(addTotal(mockReceiptData)).toEqual("4:14");
  });

  it("should total up the time from all songs if it is an artist selected and duration_ms key is not present", () => {
    const mockReceiptDataPopularity: ReceiptProps = {
      ...mockReceiptData,
      items: [
        {
          id: "21333",
          name: "Artist name",
          external_urls: {
            spotify: "2222",
          },
          popularity: 20,
        },
      ],
    };
    expect(addTotal(mockReceiptDataPopularity)).toEqual(20);
  });

  it("should return 0 total if the receipt has no tracks or artists", () => {
    const mockReceiptDataEmpty: ReceiptProps = {
      ...mockReceiptData,
      items: [
        {
          id: "21333",
          name: "Track Name",
          external_urls: {
            spotify: "2222",
          },
          duration_ms: undefined,
        },
      ],
    };

    expect(addTotal(mockReceiptDataEmpty)).toEqual(0);
  });

  it("should handle null duration_ms and return 0 total", () => {
    const mockReceiptDataNullDuration: ReceiptProps = {
      href: "https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range=short_term",
      items: [
        {
          id: "222",
          external_urls: {
            spotify: "2332",
          },
          name: "Name",
          duration_ms: null,
        },
      ],
    };

    expect(addTotal(mockReceiptDataNullDuration)).toEqual(0);
  });
});
