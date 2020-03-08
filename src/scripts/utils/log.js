import chalk from 'chalk';
import { makeTimestamp } from '/scripts/utils/time';

const isDev = process.env.NODE_ENV === 'development';

const buildLogEntry = (message, tag, timestamp, options={}) => {
  const entryOptions = {
    tagColor: options.tagColor || 'bgWhite',
    timestampColor: options.timestampColor || 'blackBright',
    messageColor: options.messageColor || 'white',
  };

  let entry = '';

  if (tag)
    entry += chalk[entryOptions.tagColor].bold(tag);
  
  if (timestamp)
    entry += ' ' + chalk[entryOptions.timestampColor](makeTimestamp());

  entry += ': ' + chalk[entryOptions.messageColor](JSON.stringify(message));

  return entry;
};

const info = (message, timestamp=true) => {
  console.log(buildLogEntry(message, 'INFO', timestamp));
};

const warn = (message, timestamp=true) => {
  console.warn(buildLogEntry(message, 'WARN', timestamp, {
    tagColor: 'bgYellow',
    timestampColor: 'yellow',
    messageColor: 'yellow',
  }));
};

const debug = (message, timestamp=true) => {
  if (!isDev) return;

  console.debug(buildLogEntry(message, 'DEBUG', timestamp, {
    tagColor: 'bgMagenta',
    timestampColor: 'cyan',
    messageColor: 'white',
  }));
};

const error = (message, timestamp=true) => {
  console.error(buildLogEntry(message, 'ERROR', timestamp, {
    tagColor: 'bgRed',
    timestampColor: 'red',
    messageColor: 'red',
  }));
};

export {
  info,
  warn,
  debug,
  error,
};
