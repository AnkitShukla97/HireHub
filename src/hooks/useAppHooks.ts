import { useSelector as reduxUseSelector, useDispatch as reduxUseDispatch, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/index";

/**
 * Typed useSelector hook - use this instead of raw useSelector
 * Automatically types the state as RootState
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;

/**
 * Typed useDispatch hook - use this instead of raw useDispatch
 * Automatically types dispatch with AppDispatch
 */
export const useAppDispatch = () => reduxUseDispatch<AppDispatch>();
