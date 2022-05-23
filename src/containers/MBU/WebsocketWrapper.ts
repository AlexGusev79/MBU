import { Data } from './types';

interface IProps {
  url: string;
}

export type State = {
  readonly data: Data[];
};

class WebSocketWrapper {
  /**
   * <code>string</code> if this sensor will be shown; otherwise, <code>string</code>
   *
   * @type {Boolean}
   * @default true
   */
  messageHandlers: string | object | undefined;

  socket: any;

  /**
   * DOC_TBA
   *
   * @alias WebSocketWrapper
   * @constructor
   */
  constructor(options: IProps) {
    var that = this;

    /*
          this.socket = new Socket(options.url);
          this.socket.on('data', function(data)
          {
            //Extract the message type
            var messageData = JSON.parse(data);
            var messageType = messageData['__MESSAGE__'];
            delete messageData['__MESSAGE__'];

            //If any handlers have been registered for the message type, invoke them
            if (that.messageHandlers[messageType] !== undefined)
            {
              for (let index in that.messageHandlers[messageType]) {
                that.messageHandlers[messageType][index](messageData);
              }
            }
          });

          */
  }
}

export { WebSocketWrapper };
