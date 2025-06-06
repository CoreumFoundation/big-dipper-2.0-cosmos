/* eslint-disable camelcase */
import * as R from 'ramda';
import { Categories } from '../types';

class MsgCancelOrdersByDenom {
  public category: Categories;

  public type: string;

  public sender: string;

  public account: string;

  public denom: string;

  public json: any;

  constructor(payload: any) {
    this.category = 'dex';
    this.json = R.pathOr({}, ['json'], payload);
    this.type = R.pathOr('', ['type'], payload);
    this.sender = R.pathOr('', ['sender'], payload);
    this.account = R.pathOr('', ['account'], payload);
    this.denom = R.pathOr('', ['denom'], payload);
  }

  static fromJson(json: any) {
    return new MsgCancelOrdersByDenom({
      category: 'dex',
      json,
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      account: R.pathOr('', ['account'], json),
      denom: R.pathOr('', ['denom'], json),
    });
  }
}

export default MsgCancelOrdersByDenom;
