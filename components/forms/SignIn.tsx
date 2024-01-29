import { InputField } from "@/components/FormFields/InputField";
import MailIcon from "@/components/icons/MailIcon";
import LockIcon from "@/components/icons/LockIcon";
import useSignIn from "@/hooks/useSignIn";

const SignInForm = () => {
  const { signIn } = useSignIn();
  return (
    <form>
      <InputField
        label="Email"
        id="signin-email"
        type="email"
        placeholder="Enter your email"
        icon={<MailIcon />}
      />

      <InputField
        label="Type Password"
        id="signin-password"
        type="password"
        placeholder="6+ Characters, 1 Capital letter"
        icon={<LockIcon />}
      />

      <div className="mb-5">
        <input
          type="submit"
          value="Sign In"
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        />
      </div>
    </form>
  );
};

export default SignInForm;
