import Vue from 'vue';

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('formatAmount', function (value) {
    if (value == null) return '0.00'
    value = parseFloat(value).toFixed(2);
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
})

Vue.filter('formatTextWithEllipsis', function (value) {
    if (value == null)
        return value
    else if (value.length <= 14)
        return value
    else
        return value.substr(0, 13)+'...'
})

Vue.filter("titleCase", function (value) {
    if (value == null) return "";
    return value
        .toLowerCase()
        .split(" ")
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
});

Vue.filter("camelToSentenceCase", function (value) {
    let result = value.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
});

