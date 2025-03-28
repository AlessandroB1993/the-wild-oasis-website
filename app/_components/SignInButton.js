function SignInButton({ provider }) {
  const providerName = provider.toLowerCase();

  return (
    <>
      <button
        type="submit"
        className="flex items-center gap-6 border border-primary-300 px-10 py-4 text-lg font-medium"
      >
        <img
          src={`https://authjs.dev/img/providers/${providerName}.svg`}
          alt={`${provider} logo`}
          height="24"
          width="24"
        />
        <span>Continue with {provider}</span>
      </button>
      <input hidden value={providerName} name="provider" readOnly />
    </>
  );
}

export default SignInButton;
