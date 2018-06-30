import slugify from './slugify'

it('creates slugs successfully', () => {
    expect(slugify('100%_runs')).toEqual('100-runs')
    expect(slugify('Flying Saucer Draught Emporium')).toEqual(
        'flying-saucer-draught-emporium'
    )
    expect(slugify('héllo there!')).toEqual('hello-there')
    expect(slugify('In-N-Out Burger')).toEqual('in-n-out-burger')
    expect(slugify("Chuy's")).toEqual('chuys')
})
