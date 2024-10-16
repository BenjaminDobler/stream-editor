


export class IDGenerator {

    private static idCount = 0;

    public static getID() {
        this.idCount++;
        return this.idCount;
    }

}