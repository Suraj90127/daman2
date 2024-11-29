import authReducer from "./reducer/authReducer";
import betReducer from "./reducer/betReducer";
import  gameReducer  from "./reducer/gameReducer";

const rootReducer = {
    auth: authReducer,
    game: gameReducer,
    bet:betReducer,
 };
export default rootReducer;