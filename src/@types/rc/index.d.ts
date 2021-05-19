declare function rc<Type>(
	name: string,
	defaults?: Type,
	argv?: {} | null,
	parse?: ((content: string) => any) | null
): Type;

export default rc;
