//vue component

Vue.component('product', {
    props:{
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">

    <div class="product-image"><img v-bind:src="image" alt="" ></div>
<!-- v-bind creates bond between data and attrotibue we want it to be bound too-->

<!--v-bind can be replaced with a colon :-->
    <div class="product-info">
            <h1>{{title}}</h1> 
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of stock</p>
       <p> User is Premium: {{premium}}</p>
    <p>Shipping: {{shipping}} </p>



            <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
<div v-for="(variant, index) in variants" :key="variant.variantId"
class="color-box"
:style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)"
>
<!--key do vue can keep track of each nodes identity, -->

</div>
<!--more @ events like mouseover, submit, click, .enter - modifyer-->

<!--incrementing button cart +=1-->

<button v-on:click="addToCart" :disabled="!inStock"
:class="{disabledButton : !inStock}"
>Add to cart</button>

 </div>

<product-tabs></product-tabs>

<!--v-if - true / v-else - false-->
<!--v show just toggles the visibility off and on-->

<div>
    <h2>Reviews </h2>
    <p v-if="!reviews.length"> there are no reviews yet.</p>
    <ul>
<li v-for="review in reviews">
<p>{{review.name}}</p>
<p>{{review.rating}}</p>
<p>{{review.review}}</p>

</li>
    </ul>
    </div>

   



<product-review @review-submitted="addReview"></product-review>


</div>
    `,
    data() {
        return { //giving instance value of socks, use double curly braces in div
    
            product: 'Socks', //asking what the value of product
    
            selectedVariant: 0,
            
           brand: 'Masterful',
    
            details: ["80% cotton", "20% polyester", "gender-neutral"],
    
            //variants
            variants: [
                {
                    variantId: 1,
                    variantColor: 'green',
                    variantImage: './assets/green.jpeg',
                    variantQuanitity: 10
                },
                {
                    variantId: 2,
                    variantColor: 'blue',
                    variantImage: './assets/blue.jpeg',
                    variantQuanitity: 0
                }
            ],
     
    
           reviews: []
    
        }
    },
    
    
    //methods
    methods: {
        addToCart(){ 
        this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId )
        },
        updateProduct (index){
            this.selectedVariant = index
            console.log(index)
            
        },
        addReview(productReview){
            this.reviews.push(productReview)
        }
    },
    computed: {
        title(){
            return this.brand + ' '  +   this.product
        },

        image (){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuanitity
        },
        shipping(){
            if (this.premium){
                return "Free"
            }
            return 2.99
        }
    },
   
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
    <b>please correct errors: </b>
<ul><li v-for="error in errors">{{error}}</li></ul>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `,

    data(){
        return {
            name:null,
            review: null,
            rating: null,
            errors:[]
        }
    },

    //methods
    methods: {
        onSubmit(){
            if(this.name&& this.review && this.rating ){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if(!this.name) this.errors.push("name required")

                if(!this.name) this.errors.push("review required")            }
                if(!this.name) this.errors.push("rating required")
        }
    }
})

Vue.component('product-tabs',
{
    template: `
    <div>
    <span class="tab"></span>
    
    </div>
    `,
    data(){
        return{
            tabs: ['']
        }
    }
})

Vue.component('product-tabs', {
    template: `
    <div>
<span class="tab"
:class="{activeTab: selectedTab === tab}"
v-for="(tab, index) in tabs" :key="index"
@click="selectedTab = tab"
>{{tab}}</span>

     </div>
    `,
    data(){
        return{
            tabs: ['Reviews', 'Make a review'],
            selectedTab: 'Reviews'
        }
    }
})

//vue is reactive, data is linked wherever its being referenced

var app = new Vue ({ //heart of vue, creates vue instance
    
    el: '#app', //we would like to plug instance into div with id of app.
    data: {
        premium: true,
        cart: []
    },
   methods: {
       updateCart(id){
       
            this.cart.push(id) //reffering to our cart in our data
       }
   }
})
