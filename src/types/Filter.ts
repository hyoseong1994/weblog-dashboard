export type filterId = "method" | "statusCode" | "ipAddress";
export type filterType = {
  [key in string]: string[];
};
