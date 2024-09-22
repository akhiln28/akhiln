# akhiln

To generate the output.css using tailwind, run the following command:

```bash
tailwindcss build -i publish/input.css -o publish/output.css
```

Nushell script to remove the header tag in all the html files in a given directory:

```nu
# remove_header.nu

# Variables
let directory_path = "path/to/your/directory"

# Glob all HTML files in the directory
let html_files = (glob $directory_path/*.html)

# Function to remove <head> tags
def remove_header_tag [file_path] {
    let file_content = open $file_path
    let updated_content = ($file_content | str find-replace -a "(?s)<head>.*?</head>" "")
    echo $updated_content | save $file_path
}

# Iterate over each HTML file and remove the <head> tag
$html_files | each { |file| remove_header_tag $file }
```
