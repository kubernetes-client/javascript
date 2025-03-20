/*
 * This function is used to generate a random name for the resources created in the tests.
 * This is to avoid conflicts with existing resources.
 */
export function generateName(name: string) {
    return name + '-' + Math.random().toString(36).substring(7);
}
