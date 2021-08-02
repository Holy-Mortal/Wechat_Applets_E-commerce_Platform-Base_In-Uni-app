export default {
  namespaced: true,
  state: () => ({
    // 购物车数组，用来存储购物车中每个商品的信息对象
    // 每个商品信息对象，包含6个属性
    // {goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state}
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // console.log(findResult);
      if(!findResult) {
        state.cart.push(goods)
      }else {
        findResult.goods_count++
      }
      // console.log(state.cart);
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state) {{
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    }},
    // 更新购物车商品勾选状态
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if(findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更新商品数量
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if(findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    // 根据Id删除对应商品
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('m_cart/saveToStorage')
    },
    // 更新购物车中所有商品勾选状态
    updateAllGoodsState(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)
      this.commit('m_cart/saveToStorage')
    }
  },
  getters: {
    // 购物车中所有商品总数量
    total(state) {
      // let c = 0
      // state.cart.forEach(x => c += x.goods_count)
      // return c
      return state.cart.reduce((total, item) => total += item.goods_count, 0)
    },
    // 购物车中已勾选商品的总数量
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    // 勾选商品总价格
    checkedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price, 0).toFixed(2)
    }
  }
}