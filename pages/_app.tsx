// import "@/styles/globals.css";
import ".././styles/globals.css";

import type { AppProps } from "next/app";
// import { Inter } from "@next/font/google";
import store from "../src/redux/store"
import { Provider } from "react-redux";
// const inder = Inter({
//   subsets: ["latin"],
// });
store.subscribe(()=>console.log(store.getState()))
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
    <main 
    
    // className={inder.className}
    >
      
      <Component {...pageProps} />
    </main>
    </Provider>
  );
}
