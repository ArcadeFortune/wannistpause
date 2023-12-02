import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { KshManagerProvider } from "./KshManager";
import Lofi from "./Components/Lofi";
import menuItems from "./menuItems";

export default function RouteMe() {
	
	return (
		<BrowserRouter>
			<KshManagerProvider>
				<Lofi />

				<Routes>
					<Route path="/" element={<App />} />
					{menuItems.map((item, index) => {
							return (
								<Route
									key={index}
									path={`/${item.content}`}
									element={
										<App
											currentView={item}
										/>
									}
								/>
							);
					})}
				</Routes>
			</KshManagerProvider>
		</BrowserRouter>
	);
}
