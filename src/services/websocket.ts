import { useSagan } from "../context/context";

export class InitiateWebsocket {
  connectionToken: string;
  websocketConn: any;

  constructor() {
    this.connectionToken = "";
    this.websocketConn = null;
  }
  initiateConnection(
    connectionToken: string,
    dispatch: Function,
    getState: Function
  ) {
    this.connectionToken = connectionToken;
    this.websocketConn = new WebSocket(
      `${import.meta.env.VITE_APP_WEBSOCKET_URL}/ws/${this.connectionToken}`
    );
    this.websocketConn.onopen = () => {
      if (this.websocketConn.readyState === this.websocketConn.OPEN) {
        // this.send({ type: "USER_RESPONSE", response: "hey im working" });
        this.onMessage(dispatch, getState);
      }
    };
  }
  send(payload: object) {
    this.websocketConn.send(
      JSON.stringify({
        ...payload,
        // timestamp: new Date(),
      })
    );
  }

  onMessage(dispatch: Function, getState: Function) {
    this.websocketConn.onmessage = (message: any) => {
      const wsResponse = JSON.parse(message?.data);
      console.log(wsResponse, "resp");
      const newState = getState();

      console.log(newState, "newState");
      dispatch({
        type: "SET_ALL_CHAT_DATA",
        payload: {
          type: "llm",
          data: {
            received: wsResponse,
          },
        },
      });
      dispatch({
        type: "INC_COUNTER",
      });
      switch (wsResponse?.type) {
        case "question1":
          console.log("ji");
          // something({ data: wsResponse?.data })
          break;
      }
    };
  }

  reconnectOnClose(socketReconnectHandler: Function) {
    this.websocketConn.onclose = () => {
      socketReconnectHandler();
    };
    this.websocketConn.onerror = (e: any) => {
      console.log(e, this.websocketConn.readyState, this.websocketConn.OPEN);
    };
  }

  keepAlivePingMessage() {
    this.send({
      action: "ping",
    });
  }
  checkIfSocketOpen() {
    return this.websocketConn.readyState === this.websocketConn.OPEN;
  }
}
