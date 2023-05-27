/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "updatekeplr.foo";

export interface MsgFooMessage {
  creator: string;
  coins: string;
}

export interface MsgFooMessageResponse {
}

function createBaseMsgFooMessage(): MsgFooMessage {
  return { creator: "", coins: "" };
}

export const MsgFooMessage = {
  encode(message: MsgFooMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.coins !== "") {
      writer.uint32(18).string(message.coins);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFooMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFooMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.coins = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgFooMessage {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      coins: isSet(object.coins) ? String(object.coins) : "",
    };
  },

  toJSON(message: MsgFooMessage): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.coins !== undefined && (obj.coins = message.coins);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFooMessage>, I>>(object: I): MsgFooMessage {
    const message = createBaseMsgFooMessage();
    message.creator = object.creator ?? "";
    message.coins = object.coins ?? "";
    return message;
  },
};

function createBaseMsgFooMessageResponse(): MsgFooMessageResponse {
  return {};
}

export const MsgFooMessageResponse = {
  encode(_: MsgFooMessageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFooMessageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFooMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgFooMessageResponse {
    return {};
  },

  toJSON(_: MsgFooMessageResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFooMessageResponse>, I>>(_: I): MsgFooMessageResponse {
    const message = createBaseMsgFooMessageResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  FooMessage(request: MsgFooMessage): Promise<MsgFooMessageResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.FooMessage = this.FooMessage.bind(this);
  }
  FooMessage(request: MsgFooMessage): Promise<MsgFooMessageResponse> {
    const data = MsgFooMessage.encode(request).finish();
    const promise = this.rpc.request("updatekeplr.foo.Msg", "FooMessage", data);
    return promise.then((data) => MsgFooMessageResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
