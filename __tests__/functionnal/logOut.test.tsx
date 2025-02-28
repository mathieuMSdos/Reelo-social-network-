import UserDropDownMenu from "@/src/myComponents/protectedHeader/UserDropDownMenu";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

// Déclaration des valeurs mockées zustand state
const mockState = {
  username: "test_user",
  displayName: "Test User",
  image: "/test-image.jpg",
};

// mock nextauth
jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

//Mock zustand :
jest.mock("@/lib/store/index.store", () => ({
  useStore: (selector: any) => selector(mockState),
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

// mock icon lucid react

jest.mock("lucide-react", () => ({
  ChevronDown: () => <div data-testid="chevron-down">ChevronDown</div>,
  LogOut: () => <div data-testid="logout-icon">LogOut</div>,
}));

// Mock BentoContainer
jest.mock("@/src/myComponents/bentoContainer/BentoContainer", () => ({
  __esModule: true,
  default: ({
    children,
    className,
  }: {
    children: ReactNode;
    className: string;
  }) => <div className={className}>{children}</div>,
}));

// Mock framer-motion de manière simplifiée
jest.mock("framer-motion", () => {
  // Création d'un composant HOC qui passe toutes les props
  const MockComponent = ({
    children,
    ...props
  }: React.ComponentProps<"div">) => (
    <div data-testid="motion-mock" {...props}>
      {children}
    </div>
  );

  // Utilisation du même MockComponent pour tous les types de motion
  return {
    motion: {
      div: MockComponent,
      button: ({
        onClick,
        children,
        ...props
      }: React.ComponentProps<"button">) => (
        <button onClick={onClick} data-testid="motion-button" {...props}>
          {children}
        </button>
      ),
    },
  };
});

//Test

describe("UserDropDownMenu", () => {
  // user event
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    
  });

  //Tester l'affichage du composant

  it("Should render UserDropDownMenu component with correct elements", () => {
    render(<UserDropDownMenu />);

    //Assertions
    expect(screen.getByAltText("profil-picture")).toHaveAttribute(
      "src",
      mockState.image
    );
    expect(screen.getByText(mockState.username)).toBeInTheDocument();
    expect(screen.getByText(mockState.displayName)).toBeInTheDocument();
  });

  // test affichage du boutton
  it("Should render logout button", () => {
    render(<UserDropDownMenu />);

    const logOutButton = screen.getByRole("button", {name: "Sign out"})

    expect(logOutButton).toBeInTheDocument()
    
  });

  // tester parcours user jusqu'au clique sur logout
  it("Should call signOut when logout button is clicked", async () => {
    render(<UserDropDownMenu />);
    
    // Ouvrir le dropdown
    await user.click(screen.getByTestId("motion-button"));
    
    // Cliquer sur le bouton de déconnexion
    await user.click(screen.getByRole("button", { name: "Sign out" }));
    
    // Vérifier que signOut a été appelé
    expect(signOut).toHaveBeenCalledTimes(1);
  });

});
