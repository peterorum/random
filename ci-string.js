( function ()
{
    "use strict";

    // code:indeed string fucntions

    exports.left = function (len, input)
    {
        return input.substr(0, len);
    };

    exports.rest = function (pos, input)
    {
        return input.substr(pos);
    };


    exports.template = function (data, input)
    {
        // format is {{ name }}

        var re = /\{\{\s*(.+?)\s*\}\}/;

        var output = input;

        var result = re.exec(output);

        while(result)
        {
            var len = result[0].length; // length of match found
            var pos = result.index; // where the match is found
            var name = result[1]; // matched property name

            // replace matched string with value of property from data
            output = exports.left(pos, output) + ((name && data[name]) || '') + exports.rest(pos + len, output);

            // search again
            result = re.exec(output);
        }

        return output;
    };

}() );
