import localstorageService from "./local-storage-service";
import moment from "moment"

/**
 * Checks if the access token is expired.
 * @returns {boolean} `true` if expired, `false` otherwise.
 */
const isAccessTokenExpired = (token) => {

  if (!token || !token?.expires_at) {
    return true;
  }

  const expireAt = moment(token.expires_at, "YYYY-MM-DD HH:mm:ss");
  return expireAt.diff(moment()) < 0; // Expired if negative difference
};

const tokenService = {
  isAccessTokenExpired,
};

export default tokenService;
