"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // const [user, setUser] = useState(null);
  // const { data: session, status } = useSession();
  // useEffect(() => {
  //   if (status === "authenticated") setUser(session?.user);
  //   else setUser(null);
  // }, [session, status]);
  // function resetAuthState() {
  //   setUser(null);
  // }
  // return (
  //   <AuthContext.Provider value={{ user, setUser, resetAuthState }}>
  //     {children}
  //   </AuthContext.Provider>
  // );
}

// export function useAuthContext() {
//   const context = useContext(AuthContext);
//   if (context === undefined)
//     throw new Error("Cannot access auth Context outside of provider");
//   return context;
// }
