import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { State, Action, StateContext, Selector } from '@ngxs/store';

import { Hero } from './hero';
import { HeroAction } from './hero.actions';
import {HeroService} from './hero.service';

export class HeroStateModel {
  selectedHero: Hero;
  heroes: Hero[];
}

@State<HeroStateModel>({
  name: 'heroes', // Stateの名前（アプリケーション内で一意）
  defaults: { // HeroStateModelのデフォルト値
    selectedHero: null,
    heroes: []
  }

})


export class HeroState {

  constructor(
    private heroService: HeroService
  ) { }

  //////// Selector //////////
  /** ヒーロー一覧 **/
  @Selector()
  static heroes(state: HeroStateModel) {
    return state.heroes;
  }

  /** サーバーからヒーローを取得する */
  @Action(HeroAction.Load)
  load(ctx: StateContext<HeroStateModel>) {
    return this.heroService.getHeroes()
      .pipe(
        tap((data) => {
         // patchStateで状態を更新
         ctx.patchState({
           heroes: data
         });
        }),
      )
  }

  /** POST: サーバーに新しいヒーローを登録する */
  @Action(HeroAction.Add)
  addHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Add) {
    const hero = action.payload;

    return this.heroService.addHero(hero).pipe(
      finalize(() => {
        ctx.dispatch(new HeroAction.Load());
      }),
    );
  }

}
