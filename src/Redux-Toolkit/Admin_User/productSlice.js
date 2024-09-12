import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    category: [
        { id: 1, name: "Electronic", description: "All Electronic" },
        { id: 2, name: "Furniture", description: "All Furniture" },
        { id: 3, name: "Clothing", description: "All Clothing" },
        { id: 4, name: "Books", description: "All Books" },
        { id: 5, name: "Toys", description: "All Toys" },
        { id: 6, name: "Groceries", description: "All Groceries" },
        { id: 7, name: "Tools", description: "All Tools" },
        { id: 8, name: "Appliances", description: "All Appliances" },
        { id: 9, name: "Sports", description: "All Sports" },
        { id: 10, name: "Music", description: "All Music" },
    ],
    subcategory: [
        { id: 1, catId: 1, name: "Mobile Phones", description: "All Mobile Phones" },
        { id: 2, catId: 2, name: "Sofas", description: "All Sofas" },
        { id: 3, catId: 2, name: "Doars", description: "All Sofas" },
        { id: 4, catId: 3, name: "Men's Clothing", description: "All Men's Clothing" },
        { id: 5, catId: 3, name: "Femail's Clothing", description: "All Men's Clothing" },
        { id: 6, catId: 4, name: "Fiction Books", description: "All Fiction Books" },
        { id: 7, catId: 4, name: "Story Books", description: "All Fiction Books" },
        { id: 8, catId: 5, name: "Educational Toys", description: "All Educational Toys" },
        { id: 9, catId: 5, name: "Robot's", description: "All Educational Toys" },
        { id: 10, catId: 6, name: "Organic Groceries", description: "All Organic Groceries" },
        { id: 11, catId: 7, name: "Power Tools", description: "All Power Tools" },
        { id: 12, catId: 8, name: "Kitchen Appliances", description: "All Kitchen Appliances" },
        { id: 13, catId: 9, name: "Fitness Equipment", description: "All Fitness Equipment" },
        { id: 14, catId: 10, name: "Musical Instruments", description: "All Musical Instruments" },
    ],
 
    product: [
        { product_ID: 1, subCatId: 1, description: 'This is the best product in the world, highly recommended!', Pname: 'Voltas 2023 Model 0.6 Ton 2 Star Split AC', Pimg: 'color.jpg', Pcolor: 'White', Pprice: 25000, Pqut: 20, dateAdded: '2024-01-07T12:00:00Z' },
        { product_ID: 2, subCatId: 2, description: 'Luxurious leather sofa set for your living room.', Pname: 'Leather Sofa Set', Pimg: 'SofaSet.jpg', Pcolor: 'Brown', Pprice: 45000, Pqut: 15, dateAdded: '2024-01-07T12:00:00Z' },
        { product_ID: 3, subCatId: 4, description: 'Stylish and comfortable casual shirt for men.', Pname: 'Men’s Casual Shirt', Pimg: 'Men’s Casual Shirt.jpg', Pcolor: 'Blue', Pprice: 1500, Pqut: 30, dateAdded: '2024-02-07T12:00:00Z' },
        { product_ID: 4, subCatId: 6, description: 'Classic novel by F. Scott Fitzgerald.', Pname: 'The Great Gatsby', Pimg: 'The Great Gatsby.jpg', Pcolor: 'N/A', Pprice: 500, Pqut: 40, dateAdded: '2024-02-07T12:00:00Z' },
        { product_ID: 5, subCatId: 8, description: 'Educational building blocks toy for kids.', Pname: 'Building Blocks Toy', Pimg: 'Building Blocks Toy.jpg', Pcolor: 'Multi-color', Pprice: 1200, Pqut: 25, dateAdded: '2024-03-07T12:00:00Z' },
        { product_ID: 6, subCatId: 10, description: 'Fresh organic apples.', Pname: 'Organic Apples', Pimg: 'Organic Apples.jpg', Pcolor: 'Red', Pprice: 300, Pqut: 50, dateAdded: '2024-04-07T12:00:00Z' },
        { product_ID: 7, subCatId: 11, description: 'Powerful and reliable cordless drill.', Pname: 'Cordless Drill', Pimg: 'Cordless Drill.jpg', Pcolor: 'Black', Pprice: 8000, Pqut: 10, dateAdded: '2024-05-07T12:00:00Z' },
        { product_ID: 8, subCatId: 12, description: 'High-performance blender for your kitchen.', Pname: 'Blender', Pimg: 'Blender.jpg', Pcolor: 'Silver', Pprice: 3500, Pqut: 20, dateAdded: '2024-06-07T12:00:00Z' },
        { product_ID: 9, subCatId: 13, description: 'Durable and comfortable yoga mat.', Pname: 'Yoga Mat', Pimg: 'Yoga Mat.jpg', Pcolor: 'Green', Pprice: 800, Pqut: 35, dateAdded: '2024-07-07T12:00:00Z' },
        { product_ID: 10, subCatId: 14, description: 'High-quality electric guitar for musicians.', Pname: 'Electric Guitar', Pimg: 'Electric Guitar.jpg', Pcolor: 'Black', Pprice: 15000, Pqut: 12, dateAdded: '2024-08-07T12:00:00Z' },

        { product_ID: 11, subCatId: 1, description: 'Latest model smartphone with advanced features.', Pname: 'Samsung Galaxy S23', Pimg: 'SamsungGalaxyS23.jpg', Pcolor: 'Phantom Black', Pprice: 80000, Pqut: 25, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 12, subCatId: 2, description: 'Elegant dining table set.', Pname: 'Wooden Dining Table', Pimg: 'WoodenDiningTable.jpg', Pcolor: 'Mahogany', Pprice: 60000, Pqut: 10, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 13, subCatId: 4, description: 'Premium quality jeans for men.', Pname: 'Levi’s Men’s Jeans', Pimg: 'LevisJeans.jpg', Pcolor: 'Dark Blue', Pprice: 3000, Pqut: 50, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 14, subCatId: 5, description: 'Adorable plush toy for kids.', Pname: 'Teddy Bear', Pimg: 'TeddyBear.jpg', Pcolor: 'Brown', Pprice: 800, Pqut: 100, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 15, subCatId: 8, description: 'Efficient microwave oven for quick meals.', Pname: 'Microwave Oven', Pimg: 'MicrowaveOven.jpg', Pcolor: 'Black', Pprice: 10000, Pqut: 30, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 16, subCatId: 9, description: 'High-performance running shoes.', Pname: 'Nike Running Shoes', Pimg: 'NikeRunningShoes.jpg', Pcolor: 'Red', Pprice: 5000, Pqut: 20, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 17, subCatId: 3, description: 'Stylish and comfortable women’s handbag.', Pname: 'Leather Handbag', Pimg: 'LeatherHandbag.jpg', Pcolor: 'Beige', Pprice: 4000, Pqut: 40, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 18, subCatId: 6, description: 'Latest bestseller book.', Pname: 'Atomic Habits', Pimg: 'AtomicHabits.jpg', Pcolor: 'N/A', Pprice: 600, Pqut: 100, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 19, subCatId: 3, description: 'Comfortable cotton t-shirt.', Pname: 'Cotton T-Shirt', Pimg: 'CottonTShirt.jpg', Pcolor: 'White', Pprice: 500, Pqut: 200, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 20, subCatId: 7, description: 'Versatile set of hand tools for DIY projects.', Pname: 'Hand Tool Set', Pimg: 'HandToolSet.jpg', Pcolor: 'Red', Pprice: 3000, Pqut: 15, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 21, subCatId: 11, description: 'Premium quality kitchen knives.', Pname: 'Kitchen Knife Set', Pimg: 'KitchenKnifeSet.jpg', Pcolor: 'Silver', Pprice: 5000, Pqut: 20, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 22, subCatId: 13, description: 'High-quality dumbbells for home workouts.', Pname: 'Dumbbell Set', Pimg: 'DumbbellSet.jpg', Pcolor: 'Black', Pprice: 6000, Pqut: 25, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 23, subCatId: 12, description: 'Stainless steel cookware set.', Pname: 'Cookware Set', Pimg: 'CookwareSet.jpg', Pcolor: 'Silver', Pprice: 7000, Pqut: 35, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 24, subCatId: 10, description: 'Bluetooth wireless earbuds with noise cancellation.', Pname: 'Wireless Earbuds', Pimg: 'WirelessEarbuds.jpg', Pcolor: 'Black', Pprice: 8000, Pqut: 60, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 25, subCatId: 14, description: 'High-fidelity sound system.', Pname: 'Home Theater System', Pimg: 'HomeTheaterSystem.jpg', Pcolor: 'Black', Pprice: 25000, Pqut: 12, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 26, subCatId: 1, description: 'Gaming laptop with high-performance specs.', Pname: 'Dell Gaming Laptop', Pimg: 'DellGamingLaptop.jpg', Pcolor: 'Black', Pprice: 120000, Pqut: 8, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 27, subCatId: 5, description: 'Decorative table lamp for your home.', Pname: 'Table Lamp', Pimg: 'TableLamp.jpg', Pcolor: 'White', Pprice: 3000, Pqut: 50, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 28, subCatId: 6, description: 'Durable and eco-friendly backpack.', Pname: 'Eco-friendly Backpack', Pimg: 'EcoFriendlyBackpack.jpg', Pcolor: 'Green', Pprice: 3500, Pqut: 70, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 29, subCatId: 9, description: 'Comfortable and stylish running shoes.', Pname: 'Adidas Running Shoes', Pimg: 'AdidasRunningShoes.jpg', Pcolor: 'Blue', Pprice: 6000, Pqut: 30, dateAdded: '2024-09-07T12:00:00Z' },
        { product_ID: 30, subCatId: 2, description: 'Luxurious and comfortable bed for your bedroom.', Pname: 'King Size Bed', Pimg: 'KingSizeBed.jpg', Pcolor: 'Walnut', Pprice: 85000, Pqut: 5, dateAdded: '2024-09-07T12:00:00Z' },
    ],
    
    favorites: [],
    productReview:[],

    selectedCategory: null,
    searchWhithDropDown: null,
    searchWhithInput: null,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // _____________________________
        // Category Reducers
        // _____________________________
        AddCate: (state, action) => {
            state.category.push(action.payload);
        },
        // _____________________________
        // SubCategory Reducers
        // _____________________________
        AddSubCate: (state, action) => {
            state.subcategory.push(action.payload);
        },
        // _____________________________
        // Product Reducers
        // _____________________________
        AddProduct: (state, action) => {
            state.product.push(action.payload);
             console.log(state.product)
          },

        // _____________________________
        // Select Catagroy Reducers
        // _____________________________

        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        // _____________________________
        // Drop Down
        // _____________________________
        DropDownFilter: (state, action) => {
            state.searchWhithDropDown = action.payload;
        },
        // _____________________________
        // Filter Bay Input
        // _____________________________
        filterBysearch: (state, action) => {
            state.searchWhithInput = action.payload
        },
        updateProductQuantity: (state, action) => {
            const { productId, quantity } = action.payload; 
            const product = state.product.find(p => p.product_ID === productId);
            if (product) {
                product.Pqut -= quantity;
                if (product.Pqut < 0) product.Pqut = 0; 
            }
        },
        

        // _____________________________________________________________
        // Product Review
        // _____________________________________________________________
        addReview:(state,action)=>{
            state.productReview.push(action.payload)
            console.log('Review Submitted:', action.payload);

        },
        // ______________________________________________________
        // ______________________________________________________
        //   Edit / Delete Product,catagroy And  subCataroy
        // ______________________________________________________
        // ______________________________________________________

        // ___________________________
        // Delete Catagroy 
        // ___________________________
        editCategory: (state, action) => {
            const index = state.category.findIndex(cat => cat.id === action.payload.id);
            if (index !== -1) {
              state.category[index] = { ...action.payload };
            }
          },
          
        deleteCategory: (state, action) => {
            const categoryId = action.payload;
            state.category = state.category.filter(cat => cat.id !== categoryId);
            state.subcategory = state.subcategory.filter(subcat => subcat.catId !== categoryId);
            state.product = state.product.filter(product => {
                const subCat = state.subcategory.find(subcat => subcat.id === product.subCatId);
                return subCat && subCat.catId !== categoryId;
            });
        },
        // ___________________________
        // Delete SubCatagroy
        // ___________________________
        deleteSubCat: (state, action) => {
            const SubcatId = action.payload;
            state.subcategory = state.subcategory.filter(subcat => subcat.id !== SubcatId);
        },
        editSubCat: (state, action) => {
            const { id, catId, name, description } = action.payload;
            const index = state.subcategory.findIndex(subcat => subcat.id === id);
            if (index !== -1) {
              state.subcategory[index] = { id, catId, name, description };
            }
          },
        // ___________________________
        // Edit  Product
        // ___________________________  
        editProduct: (state, action) => {
            const index = state.product.findIndex(product => product.product_ID === action.payload.product_ID);
            if (index !== -1) {
                state.product[index] = { ...action.payload };
                console.log(state.product[index])
            }
        },
        deleteProduct: (state, action) => {
            const productId = action.payload;
            state.product = state.product.filter(product => product.product_ID !== productId);
        },
        toggleFavorite: (state, action) => {
            const { productId, uid } = action.payload;
            const product = state.product.find(p => p.product_ID === productId);
            if (product) {
                // Check if the product is already a favorite for this user
                const isFavorite = state.favorites.some(fav => fav.productId === productId && fav.userId === uid);
                if (isFavorite) {
                    // Remove from favorites
                    state.favorites = state.favorites.filter(fav => !(fav.productId === productId && fav.userId === uid));
                } else {
                    // Add to favorites
                    state.favorites.push({ productId, userId: uid });
                }
            }
      console.log("thius is data", JSON.stringify(state.favorites, null, 2));

        }
    }
});
export const { AddCate, AddSubCate, AddProduct, setSelectedCategory, DropDownFilter, deleteCategory, filterBysearch, updateProductQuantity, deleteSubCat,editSubCat,editProduct,deleteProduct,toggleFavorite,editCategory,addReview } = productSlice.actions;
export default productSlice.reducer;
