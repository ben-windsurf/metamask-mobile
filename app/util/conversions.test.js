import {
  multiplyHexes,
  addHexes,
  decGWEIToHexWEI,
  hexToDecimal,
  getValueFromWeiHex,
  sumHexWEIs,
  subHexes,
  getEthConversionFromWeiHex,
  decimalToHex,
} from './conversions.ts';

describe('conversions utils', () => {
  describe('addHexes()', () => {
    it('should add two hex values correctly', () => {
      expect(addHexes('0xa', '0x5')).toBe('f');
    });

    it('should handle zero values', () => {
      expect(addHexes('0x0', '0x5')).toBe('5');
      expect(addHexes('0x5', '0x0')).toBe('5');
    });

    it('should handle large hex numbers', () => {
      expect(addHexes('0xffffffffff', '0x1')).toBe('10000000000');
    });

    it('should handle hex without 0x prefix', () => {
      expect(addHexes('a', '5')).toBe('f');
    });

    it('should add multiple large values', () => {
      const result = addHexes('0x1000000000000000', '0x2000000000000000');
      expect(result).toBe('3000000000000000');
    });
  });

  describe('subHexes()', () => {
    it('should subtract two hex values correctly', () => {
      expect(subHexes('0xa', '0x5')).toBe('5');
    });

    it('should handle zero result', () => {
      expect(subHexes('0x5', '0x5')).toBe('0');
    });

    it('should handle large hex numbers', () => {
      expect(subHexes('0x10000000000', '0x1')).toBe('ffffffffff');
    });

    it('should handle subtracting larger value from smaller', () => {
      const result = subHexes('0x5', '0xa');
      expect(result).toBe('-5');
    });
  });

  describe('multiplyHexes()', () => {
    it('should correctly multiply two hex numbers', () => {
      const hex1 = '0x5';
      const hex2 = '0x5';
      const expectedResult = '19';

      const result = multiplyHexes(hex1, hex2);
      expect(result).toBe(expectedResult);
    });

    it('should handle multiplication with zero', () => {
      expect(multiplyHexes('0x5', '0x0')).toBe('0');
      expect(multiplyHexes('0x0', '0x5')).toBe('0');
    });

    it('should handle multiplication with one', () => {
      expect(multiplyHexes('0x5', '0x1')).toBe('5');
    });

    it('should handle large hex multiplications', () => {
      const result = multiplyHexes('0xffff', '0xffff');
      expect(result).toBe('fffe0001');
    });
  });

  describe('decGWEIToHexWEI()', () => {
    it('should return undefined for undefined input', () => {
      expect(decGWEIToHexWEI(undefined)).toBeUndefined();
    });

    it('should return undefined for null input', () => {
      expect(decGWEIToHexWEI(null)).toBeUndefined();
    });

    it('should convert string GWEI to hex WEI', () => {
      expect(decGWEIToHexWEI('1')).toBe('3b9aca00');
    });

    it('should convert number GWEI to hex WEI', () => {
      expect(decGWEIToHexWEI(1)).toBe('3b9aca00');
    });

    it('should handle zero GWEI', () => {
      expect(decGWEIToHexWEI(0)).toBe('0');
      expect(decGWEIToHexWEI('0')).toBe('0');
    });

    it('should handle decimal GWEI values', () => {
      const result = decGWEIToHexWEI('1.5');
      expect(result).toBe('59682f00');
    });

    it('should handle large GWEI values', () => {
      const result = decGWEIToHexWEI('1000');
      expect(result).toBe('e8d4a51000');
    });
  });

  describe('hexToDecimal()', () => {
    it('should convert hex to decimal string', () => {
      expect(hexToDecimal('0xa')).toBe('10');
    });

    it('should handle hex without 0x prefix', () => {
      expect(hexToDecimal('a')).toBe('10');
    });

    it('should handle zero', () => {
      expect(hexToDecimal('0x0')).toBe('0');
    });

    it('should handle large hex values', () => {
      expect(hexToDecimal('0xffffffff')).toBe('4294967295');
    });

    it('should handle very large hex values', () => {
      const result = hexToDecimal('0x10000000000000000');
      expect(result).toBe('18446744073709551616');
    });
  });

  describe('decimalToHex()', () => {
    it('should convert decimal to hex', () => {
      expect(decimalToHex(10)).toBe('a');
    });

    it('should handle zero', () => {
      expect(decimalToHex(0)).toBe('0');
    });

    it('should handle string numbers', () => {
      expect(decimalToHex('10')).toBe('a');
    });

    it('should handle large decimal values', () => {
      expect(decimalToHex(4294967295)).toBe('ffffffff');
    });
  });

  describe('getValueFromWeiHex()', () => {
    it('should convert WEI hex to ETH', () => {
      const result = getValueFromWeiHex({ value: '0xde0b6b3a7640000', toDenomination: 'ETH' });
      expect(result).toBe('1');
    });

    it('should convert WEI hex to GWEI', () => {
      const result = getValueFromWeiHex({ value: '0x3b9aca00', toDenomination: 'GWEI' });
      expect(result).toBe('1');
    });

    it('should handle zero value', () => {
      const result = getValueFromWeiHex({ value: '0x0', toDenomination: 'ETH' });
      expect(result).toBe('0');
    });

    it('should handle large WEI values', () => {
      const result = getValueFromWeiHex({
        value: '0x56bc75e2d63100000',
        toDenomination: 'ETH',
      });
      expect(result).toBe('100');
    });

    it('should round to specified number of decimals', () => {
      const result = getValueFromWeiHex({
        value: '0x2386f26fc10000',
        toDenomination: 'ETH',
        numberOfDecimals: 5,
      });
      expect(result).toBe('0.01');
    });

    it('should handle fromCurrency parameter', () => {
      const result = getValueFromWeiHex({
        value: '0xde0b6b3a7640000', // 1 ETH in WEI
        fromCurrency: 'ETH',
        toDenomination: 'ETH',
      });
      expect(result).toBe('1');
    });
  });

  describe('sumHexWEIs()', () => {
    it('should sum array of hex values', () => {
      const result = sumHexWEIs(['0x5', '0xa', '0xf']);
      expect(result).toBe('1e'); // 5 + 10 + 15 = 30 decimal = 0x1e hex
    });

    it('should handle empty array', () => {
      const result = sumHexWEIs([]);
      expect(result).toBe('0');
    });

    it('should handle single value', () => {
      const result = sumHexWEIs(['0xff']);
      expect(result).toBe('ff');
    });

    it('should handle array with zeros', () => {
      const result = sumHexWEIs(['0x0', '0x5', '0x0']);
      expect(result).toBe('5');
    });

    it('should handle large hex values in array', () => {
      const result = sumHexWEIs(['0xffffffff', '0x1']);
      expect(result).toBe('100000000');
    });
  });

  describe('getEthConversionFromWeiHex()', () => {
    it('should convert WEI to formatted ETH string', () => {
      const result = getEthConversionFromWeiHex({
        value: '0xde0b6b3a7640000',
      });
      expect(result).toBe('1 ETH');
    });

    it('should handle zero value', () => {
      const result = getEthConversionFromWeiHex({
        value: '0x0',
      });
      expect(result).toBe('0 WEI');
    });

    it('should handle GWEI denomination', () => {
      const result = getEthConversionFromWeiHex({
        value: '0x3b9aca00',
      });
      expect(result).toBe('1 GWEI');
    });

    it('should handle small WEI values', () => {
      const result = getEthConversionFromWeiHex({
        value: '0x1',
      });
      expect(result).toBe('1 WEI');
    });

    it('should handle fromCurrency parameter', () => {
      const result = getEthConversionFromWeiHex({
        value: '0x3b9aca00',
        fromCurrency: 'GWEI',
      });
      expect(result).toBe('1 GWEI');
    });

    it('should handle numberOfDecimals parameter', () => {
      const result = getEthConversionFromWeiHex({
        value: '0xde0b6b3a7640000',
        numberOfDecimals: 2,
      });
      expect(result).toBe('1 ETH');
    });
  });
});
