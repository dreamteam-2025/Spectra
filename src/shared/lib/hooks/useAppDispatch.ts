"use client";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/providers";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
