const useAuth = () => {
  if (typeof window !== "undefined") {
    const token = localStorage?.getItem("token");
    return { isAuthenticated: !!token, token };
  }

  return { isAuthenticated: false, token: "" };
};

export default useAuth;
