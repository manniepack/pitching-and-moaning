/**
 * 
 * parseTimezoneOffset
 * 
 * @param {Number} offset
 * 
 * 
 * Date.getTimezoneOffset() returns the distance in
 * time from localtime to UTC (local -> UTC), whereas
 * I'd like to display the offset from UTC to the
 * display, localtime (UTC -> local).
 * 
 * parseTimezoneOffset takes an offset in minutes does
 * all of that.
 * 
 */
const parseTimezoneOffset = offset => {
  let newOffset = Math.abs(offset) + 0.0;
  
  /**
   * Generate remaining minutes string.
   */
  let minutes = null;
  const remainder = newOffset % 60;
  if (remainder) {
    minutes = ':' + remainder;
  } else {
    minutes = ':00';
  }

  /**
   * Convert to hours and append minutes.
   */
  newOffset = Math.floor(newOffset / 60) + minutes || '';

  let sign = null;
  if (offset <= 0) {
    sign = '+';
  } else {
    sign = '-';
  }
  newOffset = sign + newOffset;

  return newOffset;
};

const makeTimestamp = () => {
  const now = new Date(Date.now());

  const dd = now.getDate();
  const mm = now.getMonth();
  const yy = now.getFullYear();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const offset = parseTimezoneOffset(now.getTimezoneOffset());

  return `[${dd}/${mm}/${yy} @ ${hours}:${minutes}:${seconds} (UTC${offset})]`
};

export {
  makeTimestamp,
};
