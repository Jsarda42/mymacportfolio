export type Exercise = {
    id: number;
    title: string;
    instruction: string;
    lockedCode: string;   // The part they can't touch
    initialCode: string;  // The part they edit
    setupCode: string;    // Background Python setup
    secretTest: string;   // The Grader
};

export const EXERCISES: Exercise[] = [
    {
        id: 0,
        title: "Exercise 00: Hello, World!",
        instruction: "Change 'tata!' to 'World!' in ft_list using indexing. Do not recreate the list!",
        lockedCode: `# Variable provided:
# ft_list = ["Hello", "tata!"]

# Your code here:`,
        initialCode: `# Start typing...
`,
        setupCode: `
ft_list = ["Hello", "tata!"]
original_id = id(ft_list)
`,
        secretTest: `
error = None
hint = None
try:
    if "ft_list" not in locals():
        error = "Variable 'ft_list' not found."
        hint = "Make sure you didn't delete the variable name 'ft_list'!"
    elif not isinstance(ft_list, list):
        error = "ft_list must be a list."
        hint = "In Python, lists use square brackets: [item1, item2]"
    elif ft_list != ["Hello", "World!"]:
        error = f"Value Error: Expected ['Hello', 'World!'], got {ft_list}"
        if "world" in str(ft_list):
            hint = "Python is case-sensitive! Check your capitalization of 'World!'"
        else:
            hint = "You need to change 'tata!' to 'World!'"
    elif id(ft_list) != original_id:
        error = "Identity Error: You recreated the list! Use ft_list[1] = 'World!'"
        hint = "Don't use 'ft_list = [...]'. Use an index to modify it: 'ft_list[1] = ...'"
except Exception as e:
    error = str(e)

if error:
    print(f"❌ {error}")
    if hint:
        print(f"💡 HINT: {hint}")
else:
    print("PASSED")
`
    }
];