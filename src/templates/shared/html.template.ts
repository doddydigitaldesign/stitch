import { camelCase } from "../../utils/camelCase";

export const createPublicHtmlFile = (obj: {name: string;}) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${camelCase(obj.name)}</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
`
