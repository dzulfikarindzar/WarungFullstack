<template>

 <div v-if="role == 'developer'" class="row">
  
    <header
      class="col sticky-top bg-white d-flex justify-content-between py-4 shadow"
    >
      <Navbar />
      <h2 class="text-center">Edit Foods And Drinks</h2>
      <h2></h2>
    </header>
    <main class="col-12 mt-4">
      <div class="row">
        <div class="col-12 col-lg-8">
          <div class="card-body shadow">
            <!-- Button trigger modal Add Product -->
            <button type="button" class="btn" data-toggle="modal" data-target="#modalAddProduct">
             <img src="../assets/icon/plus.png" alt="" />
            </button>

            <!-- Modal Add Product -->
            <div class="modal fade" id="modalAddProduct" tabindex="-1" role="dialog" aria-labelledby="modalAddProductTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="modalAddProductTitle">
                      Add Product
                    </h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form class="modal-body">
                    <div class="form-group">
                      <div class="row">
                        <label for="nama" class="col-3 form-label pt-1">Name</label>
                        <div class="col-9">
                          <input type="text" v-model="formAddProduct.name" class="form-control" name="name" value="">
                        </div>
                      </div>
                      <div class="row pt-3">
                        <label for="price" class="col-3 form-label pt-1">Price</label>
                        <div class="col-9">
                          <input type="number" v-model="formAddProduct.price" class="form-control" name="price" value="">
                        </div>
                      </div>
                      <div class="row pt-3">
                        <label for="image" class="col-3 form-label pt-1">Image</label>
                        <div class="col-9">
                          <input type="file" class="form-control" id="file" ref="fileInput">
                        </div>
                      </div>
                      <div class="row pt-3">
                        <label for="category_id" class="col-3 form-label pt-1">Category</label>
                        <div class="col-9">
                          <select class="form-select form-control" aria-label="Default select example" v-model="formAddProduct.id_category">
                            <option v-for="category in categories" :key="category.id" :value=category.id>
                              {{category.name}}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <button type="button" class="btn btn-primary" @click="addProduct(formAddProduct)">Add</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table text-center">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category ID</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product.id">
                    <th scope="row">{{product.id}}</th>
                    <td>{{product.name}}</td>
                    <td>{{product.price}}</td>
                    <td>{{product.id_category}}</td>
                    <td>
                      <!-- Button trigger modal Edit Product -->
                      <button
                        type="button"
                        class="btn"
                        data-toggle="modal"
                        data-target="#modalEditProduct"
                        @click="editProduct(product)"
                      >
                       <img src="../assets/icon/edit.jpg" alt="" />
                      </button>

                      <!-- Modal Edit Product -->
                      <div
                        class="modal fade"
                        id="modalEditProduct"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="modalEditProductTitle"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h3 class="modal-title" id="modalEditProductTitle">
                                Edit Product
                              </h3>
                              <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <form class="modal-body text-left">
                              <div class="form-group">
                                <div class="text-center" >
                                  <img :src="formProduct.image" alt="" style="max-width: 100%; height: auto;">
                                </div>
                                <input type="hidden" v-model="formProduct.id" class="form-control" name="id_category" value="">
                                <div class="row pt-4">
                                  <label for="name" class="col-3 form-label pt-1">Name</label>
                                  <div class="col-9">
                                    <input type="text" v-model="formProduct.name" class="form-control" name="name" value="">
                                  </div>
                                </div>
                                <div class="row pt-3">
                                  <label for="price" class="col-3 form-label pt-1">Price</label>
                                  <div class="col-9">
                                    <input type="number" v-model="formProduct.price" class="form-control" name="price" value="">
                                  </div>
                                </div>
                                <div class="row pt-3">
                                  <label for="image" class="col-3 form-label pt-1">Image</label>
                                  <div class="col-9">
                                    <input type="file" class="form-control" id="fileUpdate" ref="fileUpdate">
                                  </div>
                                </div>
                                <div class="row pt-3">
                                  <label for="kategori_id" class="col-3 form-label pt-1">Category</label>
                                  <div class="col-9">
                                    <select class="form-select form-control" aria-label="Default select example" v-model="formProduct.id_category">
                                      <option selected></option>
                                      <option v-for="category in categories" :key="category.id" :value=category.id>
                                        {{category.name}}
                                      </option>
                                    </select>  
                                  </div>
                                </div>
                              </div>
                              <div class="text-right">
                                <button type="button" class="btn btn-warning" @click="updateProduct(formProduct)">Update</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <button type="button" class="btn" @click="delProduct(product)">
                      <img src="../assets/icon/del.png" alt="" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="card-body shadow">
            <!-- Button trigger modal Add Category -->
            <button
              type="button"
              class="btn"
              data-toggle="modal"
              data-target="#modalAddCategory"
            >
              <img src="../assets/icon/plus.png" alt="" />
            </button>

            <!-- Modal Add Category -->
            <div
              class="modal fade"
              id="modalAddCategory"
              tabindex="-1"
              role="dialog"
              aria-labelledby="modalAddCategoryTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="modalAddCategoryTitle">
                      Add Category
                    </h3>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form class="modal-body">
                    <div class="form-group">
                      <div class="row">
                        <label for="name" class="col-4 form-label pt-1">Name Category</label>
                        <div class="col-8">
                          <input type="text" v-model="formAddCategory.name" class="form-control" name="name">
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <button type="button" class="btn btn-primary" @click="addCategory(formAddCategory)">Add</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <table class="table text-center">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Category</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in categories" :key="category.id">
                  <th scope="row">{{category.id}}</th>
                  <td>{{category.name}}</td>
                  <td class="d-flex justify-content-center">
                    <!-- Button trigger modal Edit Category -->
                    <button
                      type="button"
                      class="btn"
                      data-toggle="modal"
                      data-target="#modalEditCategory"
                      @click="editCategory(category)"
                    >
                     <img src="../assets/icon/edit.jpg" alt="" />
                    </button>

                    <!-- Modal Edit Category -->
                    <div
                      class="modal fade"
                      id="modalEditCategory"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="modalEditCategoryTitle"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h3 class="modal-title" id="modalEditCategoryTitle">
                              Edit Category
                            </h3>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <form class="modal-body text-left">
                            <div class="form-group">
                              <input type="hidden" v-model="formCategory.id" class="form-control" name="name" value="">
                              <div class="row">
                                <label for="name" class="col-4 form-label pt-1">Name Category</label>
                                <div class="col-8">
                                  <input type="text" v-model="formCategory.name" class="form-control" name="name" value="" required>
                                </div>
                              </div>
                            </div>
                            <div class="text-right">
                              <button type="button" class="btn btn-warning" @click="updateCategory(formCategory)">Update</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <button type="button" class="btn" @click="delCategory(category)">
                     <img src="../assets/icon/del.png" alt="" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import axios from "axios";
import router from '../routes';
import FormData from 'form-data';

export default {
  name: "Products",
  components: {
    Navbar,
  },
  data(){
    return{
      products:[],
      formAddProduct:{
        name:null,
        price:null,
        id_category:null,
      },
      formProduct:{
        id:null,
        name:null,
        price:null,
        id_category:null,
      },
      categories: [],
      formAddCategory:{
        category:null,
      },
      formCategory:{
        id:null,
        name:null,
      },
      cacheKey: 'token',
      roleKey: 'role',
      role: '',
    }
  },
  methods:{
    loadProducts(){
      axios.get(process.env.VUE_APP_PRODUCT, {
        headers: {
          authtoken: localStorage.getItem(this.cacheKey)
        }
      })
      .then((res) => {
        if(res.data.result.name === 'TokenExpiredError'){
          alert('Token Expired! Silahkan Login Lagi');
          router.push({ path: '/' });
        }else
        if(res.data.result[0].msg === 'Login dulu!'){
          alert('Login Dulu!');
          router.push({ path: '/' });
        }else
        if(res.data.result[0].msg === 'Not Found'){
          alert('404 | Not Found');
          router.push('404');
        }else{
          this.products = res.data.result;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    addProduct(data){
      if(data.name === '' || data.name === null){
        return alert('Isi namanya!')
      }
      if(data.price === '' || data.price === null){
        return alert('Isi harganya!')
      }
      if(this.$refs.fileInput.value === '' || this.$refs.fileInput.value === null){
        return alert('Isi gambarnya!')
      }
      if(data.id_category === '' || data.id_category === null){
        return alert('Isi kategorinya!')
      }

      let formData = new FormData;
      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('image', this.$refs.fileInput.files[0]);
      formData.append('id_category', data.id_category);

      axios.post(process.env.VUE_APP_PRODUCT, formData, {
        headers: {
          authtoken: localStorage.getItem(this.cacheKey),
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        this.loadProducts()
        this.formAddProduct.name=null
        this.formAddProduct.price=null
        this.formAddProduct.id_category=null
        this.$refs.fileInput.value=null
        alert('Success Add Product!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Add Product!')
      });
    },
    editProduct(value){
      this.formProduct.id = value.id;
      this.formProduct.name = value.name;
      this.formProduct.price = value.price;
      this.formProduct.image = value.image;
      this.formProduct.id_category = value.id_category;
    },
    updateProduct(data){
      if(data.name === '' || data.name === null){
        return alert('Isi namanya!')
      }
      if(data.price === '' || data.price === null){
        return alert('Isi harganya!')
      }
      if(data.id_category === '' || data.id_category === null){
        return alert('Isi kategorinya!')
      }

      let formData = new FormData;
      formData.append('id', data.id);
      formData.append('name', data.name);
      formData.append('price', data.price);
      if(this.$refs.fileUpdate[0].value === '' || this.$refs.fileUpdate[0].value === null){
        formData.append('image', data.image);
      }else{
        formData.append('image', this.$refs.fileUpdate[0].files[0]);
      }
      formData.append('id_category', data.id_category);
      
      axios.put(process.env.VUE_APP_PRODUCT, formData, {
        headers: {
          authtoken: localStorage.getItem(this.cacheKey),
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        this.loadProducts()
        alert('Success Update Product!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Update Product!')
      });
    },
    delProduct(value){
      axios.delete(process.env.VUE_APP_PRODUCT + `/${value.id}`, {
        headers: {
          authtoken: localStorage.getItem(this.cacheKey)
        }
      })
      .then(() => {
        this.loadProducts()
        alert('Success Delete Product!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Delete Product!')
      });
    },

    loadCategories(){
      axios.get(process.env.VUE_APP_CATEGORY, {
        headers: {
          authtoken: localStorage.getItem(this.cacheKey)
        }
      })
      .then((res) => {
        this.categories = res.data.result;
        // console.log(this.categories);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    addCategory(value){
      axios.post(process.env.VUE_APP_CATEGORY, value, {
        headers: {
          authtoken: localStorage.getItem(this.cacheKey)
        }
      })
      .then(() => {
        this.loadCategories()
        this.formAddCategory.name=null
        // alert('Success Add Category!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Add Category!')
      });
    },
    editCategory(value){
      this.formCategory.id = value.id;
      this.formCategory.name = value.name;
    },
    updateCategory(value){
      axios.put(process.env.VUE_APP_CATEGORY, value, {
        headers: {
          authtoken: localStorage.getItem(this.cacheKey)
        }
      })
      .then(() => {
        this.loadCategories()
        alert('Success Update Category!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Update Category!')
      });
    },
    delCategory(value){
      axios.delete(process.env.VUE_APP_CATEGORY + `/${value.id}`, {
        headers: {
          authtoken: localStorage.getItem(this.cacheKey)
        }
      })
      .then(() => {
        this.loadCategories()
        alert('Success Delete Category!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Delete Category!')
      });
    },
  },
  mounted(){
    this.loadCategories()
    this.loadProducts()
    this.role = localStorage.getItem(this.roleKey)
  }
};
</script>
