import { useReducer } from 'react';
import MenuContext from './MenuContext';
import MenuReducer from './MenuReducer';
import { SET_ACTIVE_CTGS, SET_ACTIVE_PRICE_RANGES, SET_MENU } from './types';

export const MenuProvider = ({ children }) => {
  const initialState = {
    menu: {},
    ctgs: [], // active categories
    prices: {
      min: 0,
      max: -1,
      ranges: [],
    }, // active price ranges
  };

  const [state, dispatch] = useReducer(MenuReducer, initialState);

  const setMenu = menu => {
    dispatch({ type: SET_MENU, payload: menu });
  };

  const setActiveCategories = ctgs => {
    const sortedCtgs = [...ctgs].sort((a, b) => {
      return a.localeCompare(b, 'es', { sensitivity: 'base' });
    });

    dispatch({ type: SET_ACTIVE_CTGS, payload: sortedCtgs });
  };

  const setActivePriceRanges = ranges => {
    if (!ranges || ranges.length === 0) {
      return dispatch({
        type: SET_ACTIVE_PRICE_RANGES,
        payload: initialState.prices,
      });
    }

    let min = initialState.prices.min;
    let max = initialState.prices.max;

    for (let range of ranges) {
      min = min < range[0] ? min : range[0];
      max = max > range[1] ? max : range[1];
    }

    return dispatch({
      type: SET_ACTIVE_PRICE_RANGES,
      payload: { min, max, ranges },
    });
  };

  const addActivePriceRange = range => {
    let min = state.prices.min;
    let max = state.prices.max;

    if (min > range[0]) min = range[0];
    if (max < range[1] || range[1] === -1) max = range[1];

    return dispatch({
      type: SET_ACTIVE_PRICE_RANGES,
      payload: { min, max, ranges: [...state.prices.ranges, range] },
    });
  };

  const removeActivePriceRange = range => {
    let newRanges = state.prices.ranges.fitler(r => {
      return !(r[0] === range[0] && r[1] === range[1]);
    });

    return setActivePriceRanges(newRanges);
  };

  const getCategoryProducts = ctg => {
    return state.menu[ctg];
  };

  /* useEffect(() => {
    let newMenu = {};

    for (let ctg in state.menu) {
      let data = state.menu[ctg];

      newMenu[ctg] = {
        products: data.products,
        visibleProducts: data.products.filter(p => {
          const isGteMin = p.price >= state.prices.min;
          const isLteMax =
            state.prices.max === -1 || p.price <= state.prices.max;

          return isGteMin && isLteMax;
        }),
      };
    }

    return setMenu(newMenu);
  }, [state.prices.min, state.prices.max]); */

  return (
    <MenuContext.Provider
      value={{
        menu: state.menu,
        ctgs: state.ctgs,
        prices: state.prices,
        setMenu,
        getCategoryProducts,
        setActiveCategories,
        setActivePriceRanges,
        addActivePriceRange,
        removeActivePriceRange,
      }}>
      {children}
    </MenuContext.Provider>
  );
};
