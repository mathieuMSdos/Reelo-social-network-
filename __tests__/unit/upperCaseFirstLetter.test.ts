import { upperFirstLetterOfAString } from "@/lib/utils/scriptJS/upperCaseFirstLetter";

describe("Unit Test upperFirstLetterOfAString function", () => {
  // Arrange
  const stringTest1 = "hello world";
  const stringTest2 = "HELLO WORLD";
  const stringTest3 = "Hello World";

  it("Should return string with firstletter with uppercase", () => {
    //Acte
    const result1 = upperFirstLetterOfAString(stringTest1);
    const result2 = upperFirstLetterOfAString(stringTest2);
    const result3 = upperFirstLetterOfAString(stringTest3);

    //Assert

    expect(result1).toBe("Hello world");
    expect(result2).toBe("HELLO WORLD");
    expect(result3).toBe("Hello World");
  });
});
