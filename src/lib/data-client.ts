type AnyFn = (...args: any[]) => Promise<any>;

const disabled: AnyFn = async () => {
    throw new Error("This website build does not enable private content management features.");
};

function createModel() {
    return new Proxy(
        {},
        {
            get() {
                return disabled;
            },
        }
    );
}

const dataClient = new Proxy(
    {},
    {
        get() {
            return createModel();
        },
    }
) as any;

export { dataClient };
export default dataClient;
