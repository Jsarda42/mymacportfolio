export type Exercise00 = {
    id: number;
    exNumber: string;
    title: string;
    instruction: string;
    lockedCode: string;
    initialCode: string;
    setupCode: string;
    secretTest: string;
};
export const EXERCISE00: Exercise00[] = [
    {
        id: 0,
        exNumber: "00",
        title: "Exercise 00: Hello, World!",
        instruction: `This exercise introduces you to the core data structures of Python. You will learn how to manipulate them and, more importantly, how they behave differently in memory.

Your Goal: Update all variables so that 'tata!' becomes 'World!'.`,
        lockedCode: `# Variables provided:
# ft_list = ["Hello", "tata!"]
# ft_tuple = ("Hello", "tata!")
# ft_set = {"Hello", "tata!"}
# ft_dict = {"Hello" : "tata!"}

# Your code here:`,
        initialCode: `# Start typing...
`,
        setupCode: `
ft_list = ["Hello", "tata!"]
ft_tuple = ("Hello", "tata!")
ft_set = {"Hello", "tata!"}
ft_dict = {"Hello" : "tata!"}
original_list_id = id(ft_list)
original_set_id = id(ft_set)
original_dict_id = id(ft_dict)
`,
        secretTest: `
error_to_show = None
hint = None
tasks_todo = 0

# 1. Catch the specific "Crash" before logical checks
user_err_type = locals().get('__USER_ERROR__')
user_err_msg = str(locals().get('__USER_ERROR_MSG__', '')).lower()

if user_err_type == 'TypeError':
    if 'tuple' in user_err_msg:
        error_to_show = "Immutability Error (Tuple)"
        hint = "You tried to change a Tuple index directly. Tuples are 'frozen'. You must re-assign the whole variable."
    elif 'set' in user_err_msg:
        error_to_show = "Unordered Error (Set)"
        hint = "Sets do not support indexing like [1]. Use ft_set.remove() and .add()."

# 2. Logic & Identity Validation (Only if no crash occurred)
if not error_to_show:
    l, t, s, d = locals().get('ft_list'), locals().get('ft_tuple'), locals().get('ft_set'), locals().get('ft_dict')

    # Check LIST
    if l == ["Hello", "tata!"]: tasks_todo += 1
    elif id(l) != original_list_id:
        error_to_show, hint = "Identity Error (List)", "Don't use '='. Modify the index directly."
    elif l != ["Hello", "World!"]:
        error_to_show, hint = "Value Error (List)", "Check list content spelling."

    # Check TUPLE (If no crash, check value)
    if not error_to_show:
        if t == ("Hello", "tata!"): tasks_todo += 1
        elif t != ("Hello", "World!"):
            error_to_show, hint = "Value Error (Tuple)", "ft_tuple should be ('Hello', 'World!')"

    # Check SET
    if not error_to_show:
        if s == {"Hello", "tata!"}: tasks_todo += 1
        elif id(s) != original_set_id:
            error_to_show, hint = "Identity Error (Set)", "Don't use '='. Use .remove() and .add()."
        elif s != {"Hello", "World!"}:
            error_to_show, hint = "Value Error (Set)", "Set content is incorrect."

    # Check DICT
    if not error_to_show:
        if d == {"Hello": "tata!"}: tasks_todo += 1
        elif id(d) != original_dict_id:
            error_to_show, hint = "Identity Error (Dict)", "Don't use '='. Update the key directly."
        elif d.get("Hello") != "World!":
            error_to_show, hint = "Value Error (Dict)", "Dict value is incorrect."

# Final Output
if error_to_show:
    print(f"❌ {error_to_show}")
    print(f"💡 HINT: {hint}")
elif tasks_todo > 0:
    print(f"⌛ Almost there!")
    print(f"💡 HINT: You still have {tasks_todo} task(s) to complete.")
else:
    print("PASSED")
`
    }
];