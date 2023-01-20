import Card from "../components/screens/Cart/Cart";
import Catalog from "../components/screens/Catalog/Catalog";
import Favorites from "../components/screens/Favorites/Favorites";
import Home from "../components/screens/Home/Home";
import Product from "../components/screens/Product/Product";
import Search from "../components/screens/Search/Search";
import {iRoutes} from "./navigationTypes";

export const userRoutes: iRoutes[] = [
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Cart',
		component: Card
	},
	{
		name: 'Catalog',
		component: Catalog
	},
	{
		name: 'Product',
		component: Product
	},
	{
		name: 'Search',
		component: Search
	},
	{
		name: 'Favorites',
		component: Favorites
	},

]