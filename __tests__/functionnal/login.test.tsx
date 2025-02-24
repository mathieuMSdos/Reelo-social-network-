import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";
import { Login } from "../../src/myComponents/connexion/login/Login";

// Mock nextauth
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: {
    src: string;
    alt: string;
    className?: string;
    width: number;
    height: number;
  }) => <img {...props} />,
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock Button de shadcnUi
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

//Tests

describe("Login component", () => {
  // Extrait les props passées par le parent pour plus de maintenabilité si jamais on veux changer les textes dans le futur
  const customProps = {
    heading: "Log in",
    subheading: "Log in to your account",
    googleText: "Continue with Google",
    signUpText: "Don't have an account?",
    signUpUrl: "/signup",
  };

  // Ssetup userEvent

  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test l'affichge du composant

  it("Should render login component with correct elements", () => {
    // rendu du composant React
    render(<Login {...customProps} />);

    //Assertions

    expect(screen.getByText(customProps.heading)).toBeInTheDocument();
    expect(screen.getByText(customProps.subheading)).toBeInTheDocument();
    expect(screen.getByText(customProps.googleText)).toBeInTheDocument();
    expect(screen.getByText(customProps.signUpText)).toBeInTheDocument();

    //test affichage lien
    const link = screen.getByRole("link", { name: "Sign up" });
    expect(link).toHaveAttribute("href", customProps.signUpUrl);

    // Test affichage button
    const signInButton = screen.getByRole("button", {
      name: /Continue with Google/i,
    });
    expect(signInButton).toBeInTheDocument();
  });

  // test intéraction avec le bouton
  it("sould call signin when Google Button is clicked", async () => {
    render(<Login {...customProps} />);

    const signInButton = screen.getByRole("button", {
      name: /Continue with Google/i,
    });
    expect(signInButton).toBeInTheDocument();

    // test du click
    await user.click(signInButton);

    // Vérifier que signin est appelé avec le provider google
    expect(signIn).toHaveBeenCalledWith("google");
  });
});
