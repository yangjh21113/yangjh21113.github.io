
function a(a){return 1}

test('x', ()=> {
    expect(a(1)).toEqual(1)
})