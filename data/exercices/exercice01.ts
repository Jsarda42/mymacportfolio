import { Exercises } from "@/types/exercices";

export const EXERCISE01: Exercises[] = [
    {
        id: 1,
        exNumber: "01",
        title: "Exercise 01: Formatting Dates",
        instruction: `Write a script that retrieves the current time and formats it exactly as shown.
        
**Expected format:**
1. Seconds since Epoch (with 4 decimal places and commas).
2. The same value in scientific notation (2 decimal places).
3. The current date in 'Month Day Year' format (e.g., Oct 21 2022).

**Hint:** Look into the 'time' and 'datetime' modules.`,
        lockedCode: `# Expected Output:
# Seconds since January 1, 1970: 1,666,355,857.3622 or 1.67e+09 in scientific notation
# Oct 21 2022`,
        initialCode: `import time
from datetime import datetime

# Your code here:
`,
        setupCode: `import time`,
        secretTest: `
import re
from datetime import datetime

# 1. Clean the output: remove empty lines
raw_output = locals().get('__USER_OUTPUT__', '')
lines = [l.strip() for l in raw_output.split('\\n') if l.strip()]

error = None
hint = None

if len(lines) != 2:
    error = "Output Error"
    hint = f"Expected 2 lines, but found {len(lines)}."

if not error:
    line1, line2 = lines[0], lines[1]
    if "Seconds since January 1, 1970:" not in line1:
        error = "Format Error (Line 1)"
        hint = "Line 1 must start with 'Seconds since January 1, 1970:'"
    
    date_pattern = r"^[A-Z][a-z]{2}\\s\\d{2}\\s\\d{4}$"
    if not re.match(date_pattern, line2):
        error = "Date Format Error"
        hint = "Line 2 must be in 'Month Day Year' format."

print("---VALIDATION_START---")
if error:
    print(f"❌ {error}")
    print(f"💡 HINT: {hint}")
else:
    print("PASSED")
`,
    }
];