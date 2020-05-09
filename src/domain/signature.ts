import BN from 'bn.js'

export const secp256k1N = new BN(
  'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141',
  16
)

export const secp256k1halfN = secp256k1N.div(new BN(2))

export class Signature {
  private readonly buffer: Buffer;

  public constructor (buffer: Buffer) {
    if (buffer.length !== 65) {
      throw TypeError(
        `Signature: invalid signature. buffer length must be 65. actual: ${buffer.length}`
      )
    }

    this.buffer = buffer

    if (![27, 28].includes(this.recovery)) {
      throw Error(
        `Signature: invalid signature. V must be 27 or 28. actual: ${this.recovery}`
      )
    }

    if (!this.isCompatibleEip2()) {
      const s = new BN(this.s)
      const recovery = Buffer.alloc(1)
      recovery.writeUInt8((this.v % 2) + 27, 0)

      this.buffer = Buffer.concat([
        this.r,
        secp256k1N.sub(s).toBuffer('be', 32),
        recovery
      ])
    }
  }

  public static fromRSV (r: Buffer, s: Buffer, v: number): Signature {
    const recovery = Buffer.alloc(1)
    recovery.writeUInt8(v, 0)
    return new Signature(Buffer.concat([r, s, recovery]))
  }

  public get r (): Buffer {
    return this.buffer.slice(0, 32)
  }

  public get s (): Buffer {
    return this.buffer.slice(32, 64)
  }

  public get v (): number {
    return this.buffer.readUInt8(64)
  }

  public get recovery (): number {
    return this.v
  }

  public isCompatibleEip2 (): boolean {
    const s = new BN(this.s)
    return secp256k1halfN.cmp(s) > 0
  }
}
