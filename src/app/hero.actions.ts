import { Hero } from './hero';

export module HeroAction {

  export const LOAD_HERO = 'Load_Hero';
  export const SELECT_HERO = 'Select_Hero';
  export const ADD_HERO = 'Add_Hero';
  export const DELETE_HERO = 'Delete_Hero';
  export const UPDATE_HERO = 'Update_Hero';

  /** 全ヒーローを取得する **/
  export class Load {
    static readonly type = LOAD_HERO;
  }

  /** ヒーローを選択する **/
  export class Select {
    static readonly type = SELECT_HERO;

    constructor(public id: number) {}
  }

  /** ヒーローを追加する **/
  export class Add {
    static readonly type = ADD_HERO;

    constructor(public payload: Hero) {}
  }

  /** ヒーローを削除する **/
  export class Delete {
    static readonly type = DELETE_HERO;

    constructor(public payload: Hero) {}
  }

  /** ヒーローの名前を変更する **/
  export class Update {
    static readonly type = UPDATE_HERO;

    constructor(public payload: Hero) {}
  }
}
