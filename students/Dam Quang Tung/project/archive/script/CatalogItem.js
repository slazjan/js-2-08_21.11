Vue.component ('catalog-item', {

    template: `
    <div class="product-item" :data-id="item.id_product">
        <img :src="imgProp" alt="Some img">
        <div class="desc">
            <h3> {{item.product_name}} </h3>
            <p>{{item.price}} rub.</p>
            <button class="buy-btn" @click="$root.$refs.cart.addProduct(item)">Купить</button>
        </div>
    </div>
    `,
    props: ['item', 'imgProp']
})