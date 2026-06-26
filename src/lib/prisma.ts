type AnyFn = (...args: any[]) => Promise<any>;

const disabled: AnyFn = async () => {
    throw new Error("Database-backed admin features are disabled in the public DeadZone website build.");
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

const prisma = new Proxy(
    {},
    {
        get() {
            return createModel();
        },
    }
) as any;

export { prisma };
export default prisma;
