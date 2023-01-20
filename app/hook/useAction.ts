import {bindActionCreators} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {cartAction} from "../store/slice/CartSlices";
import {favoriteAction} from "../store/slice/favoriteSlice";


const allActons = {
	...cartAction,
	...favoriteAction
}
export const useAction = () => {
	const dispatch = useDispatch()
	
	return bindActionCreators(allActons, dispatch)
}