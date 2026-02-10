export type Exercise = {
    id: number;
    title: string;
    instruction: string;
    lockedCode: string;
    initialCode: string;
    setupCode: string;
    secretTest: string;
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

# 1. Check if the Runner caught a crash during user execution
user_err_type = locals().get('__USER_ERROR__')
user_err_msg = locals().get('__USER_ERROR_MSG__')

if user_err_type == 'IndexError':
    error = "Index Error"
    hint = "Python lists are 0-indexed. Index 0 is 'Hello', Index 1 is the second element. Index 2 is out of bounds!"
elif user_err_type == 'NameError':
    error = "Variable Error"
    hint = "You are using a variable name that hasn't been defined. Did you rename 'ft_list'?"
elif user_err_type:
    error = f"Runtime Error ({user_err_type})"
    hint = user_err_msg

# 2. If no crash, run the logical validation
if not error:
    current_obj = locals().get('ft_list')
    
    if current_obj is None:
        error = "Variable Error"
        hint = "ft_list seems to have disappeared!"
    
    elif not isinstance(current_obj, list):
        error = f"Type Error: ft_list is a {type(current_obj).__name__}."
        hint = "Keep it as a list! Use [] brackets, not ()."

    elif id(current_obj) != original_id:
        error = "Identity Error"
        hint = "Do not use '=' to recreate the list. Modify index 1 directly: ft_list[1] = 'World!'"

    elif len(current_obj) != 2:
        error = "Size Error"
        hint = f"The list should have 2 elements, but yours has {len(current_obj)}."

    elif current_obj[0] != "Hello":
        error = "Data Corruption"
        hint = "You changed 'Hello' at index 0. Only index 1 should change."

    elif current_obj[1] != "World!":
        error = "Value Error"
        if current_obj[1].lower() == "world!":
            hint = "Case-sensitivity! 'World!' needs a capital W."
        else:
            hint = "Check the spelling of 'World!' (don't forget the !)."

# Final Output
if error:
    print(f"❌ {error}")
    if hint: print(f"💡 HINT: {hint}")
else:
    print("PASSED")
`
    }
];