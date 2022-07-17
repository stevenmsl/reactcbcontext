import {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
  FormEvent,
  ChangeEvent,
} from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { emailReducer, passwordReducer, StateType, ActionTypes } from "./store";
import AuthContext from "../../store/auth-context";
import classes from "./Login.module.css";

const initState: StateType = { value: "", isValid: false };

/* design summary 
   - use onChange event to capture the value changes and update 
     the state
   - use onBlur event to validate the value in the input when 
     it loses focus
   - use a timer to debounce the validation of the entire form
*/

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  /* #TA06 */
  const [emailState, dispatchEmail] = useReducer(emailReducer, initState);
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initState
  );

  const ctx = useContext(AuthContext);
  /* #TA08 */
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  /* debounce */
  useEffect(() => {
    const handle = setTimeout(() => {
      console.log("Check if the form is valid");
      setFormIsValid(emailIsValid! && passwordIsValid!);
    }, 500);

    return () => {
      console.log("Clean Up!");
      clearTimeout(handle);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchEmail({
      type: ActionTypes.USER_INPUT,
      payload: { val: event.target.value },
    });
  };
  /* validate the value after losing the focus */
  const validateEmailHandler = () => {
    dispatchEmail({ type: ActionTypes.INPUT_BLUR });
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchPassword({
      type: ActionTypes.USER_INPUT,
      payload: { val: event.target.value },
    });
  };
  /* validate the value after losing the focus */
  const validatePasswordHandler = () => {
    dispatchPassword({ type: ActionTypes.INPUT_BLUR });
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formIsValid) ctx.onLogin(emailState.value, passwordState.value);
    else if (!emailIsValid) emailInputRef.current?.focus();
    else passwordInputRef.current?.focus();
  };

  /* #TA09 connect the ref */
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
