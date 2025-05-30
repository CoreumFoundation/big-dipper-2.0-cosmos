/* eslint-disable camelcase */
import * as R from 'ramda';
import { Categories } from '../types';

interface MsgUpdateDataItems {
  index: number;
  data: string;
}

class MsgUpdateData {
  public category: Categories;

  public type: string;

  public json: any;

  public sender: string;

  public class_id: string;

  public id: string;

  public items: MsgUpdateDataItems[];

  constructor(payload: any) {
    this.category = 'asset';
    this.json = R.pathOr({}, ['json'], payload);
    this.type = R.pathOr('', ['type'], payload);
    this.sender = R.pathOr('', ['sender'], payload);
    this.class_id = R.pathOr('', ['class_id'], payload);
    this.id = R.pathOr('', ['id'], payload);
    this.items = R.pathOr([], ['items'], payload);
  }

  static fromJson(json: any) {
    return new MsgUpdateData({
      category: 'asset',
      json,
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      class_id: R.pathOr('', ['class_id'], json),
      id: R.pathOr('', ['id'], json),
      items: R.pathOr([], ['items'], json),
    });
  }
}

export default MsgUpdateData;
