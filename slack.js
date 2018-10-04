
import { SlackOAuthkClient } from 'messaging-api-slack';
import utils from '../utils';
import config from '../../config';

const client = SlackOAuthkClient.connect(config.providers.slack.accessToken);

function formatMessage(type, hash, address, value) {
    const formattedMessage = config.providers.slack.message
      .replace('%currency%', config.cryptocurrency.name)
      .replace('%type%', type)
      .replace('%tx_hash%', hash.substring(0, 17))
      .replace('%address%', address)
      .replace('%value%', value)
      .replace('%currency%', config.cryptocurrency.name)
      .replace('%explorer%', config.cryptocurrency.blockExplorer)
      .replace('%hash%', hash)
      .replace('%date%', utils.getDateConfig());
  
    return formattedMessage;
};

function sendMessage(type, hash, address, value) {
    client.postMessage(config.providers.telegram.chatId, formatMessage(type, hash, address, value));
};

export default {
    sendMessage
};