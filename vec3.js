function vec3_create(x, y, z)
{
    return [x, y, z];
}

function vec3_copy(vec, other)
{
    vec[0] = other[0];
    vec[1] = other[1];
    vec[2] = other[2];
}

function vec3_mul(vec, s)
{
    vec[0] *= s;
    vec[1] *= s;
    vec[2] *= s;
}

function vec3_pow(vec, e)
{
    vec[0] = Math.pow(vec[0], e);
    vec[1] = Math.pow(vec[1], e);
    vec[2] = Math.pow(vec[2], e);
}

function vec3_mix(out, a, b, fac)
{
    out[0] = b[0] * fac + a[0] * (1 - fac);
    out[1] = b[1] * fac + a[1] * (1 - fac);
    out[2] = b[2] * fac + a[2] * (1 - fac);
}

function vec3_str(vec)
{
    return `vec3(${vec[0]}, ${vec[1]}, ${vec[2]})`;
}

function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
}

function vec3_rgbstr(vec)
{
    let r = clamp(vec[0] * 255, 0, 255);
    let g = clamp(vec[1] * 255, 0, 255);
    let b = clamp(vec[2] * 255, 0, 255);

    return `rgba(${r}, ${g}, ${b}, 1)`;
}